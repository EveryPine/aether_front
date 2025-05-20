import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTaskInfo, updateTask } from "../api/taskApi";
import { fetchUserInfo } from "../api/userApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const projectId = "679aedec4f051a6eaac0204c"; // 현재 프로젝트 ID (하드코딩)

const taskSchema = z.object({
  title: z.string().min(1, ""),
  description: z.string().min(1, ""),
  isDaily: z.boolean(),
  status: z.string(),
  projectScope: z.string(),
  priority: z.number(),
  startDate: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
  dueDate: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
  createdBy: z.string(),
  creator: z.string(),
  project: z.string(),
  assignedTo: z.array(z.string()).optional(),
});

export interface TaskInfoValues extends z.infer<typeof taskSchema> {}

export const useTask = (tid: string | null, isCreate: boolean, fetchTasks: () => void, closeTab: () => void) => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery(["userInfo"], () => fetchUserInfo());
  const { data: taskData, isLoading } = useQuery(["taskInfo", tid], () => fetchTaskInfo(tid as string), {
    enabled: !isCreate && !!tid,
    initialData: null,
  });

  const methods = useForm<TaskInfoValues>({
    defaultValues: {
      title: "",
      description: "",
      isDaily: false,
      status: "To Do",
      projectScope: "Public",
      priority: 1,
      startDate: "",
      dueDate: "",
      createdBy: "",
      creator: "",
      project: projectId,
      assignedTo: undefined,
    },
    resolver: zodResolver(taskSchema),
  });

  //기존 데이터를 가져오면 reset
  useEffect(() => {
    if (taskData?.data && userInfo) {
      methods.reset({
        title: taskData.data.title || "",
        description: taskData.data.description || "",
        isDaily: taskData.data.isDaily || false,
        status: taskData.data.status || "To Do",
        projectScope: taskData.data.projectScope || "Public",
        priority: taskData.data.priority || 0,
        startDate: taskData.data.startDate || "",
        dueDate: taskData.data.dueDate || "",
        createdBy: taskData.data.createdBy,
        creator: taskData.data.creator || "",
        project: taskData.data.project || projectId,  // ✅ 프로젝트 ID 반영
        assignedTo: taskData.data.assignedTo || undefined,
      });
    }
  }, [taskData, userInfo, projectId, methods]);  // ✅ userInfo, projectId 의존성 추가


  // 업무 생성 mutation
  const createTaskMutation = useMutation(
    (newTask: TaskInfoValues) => {
      // createdBy 필드 제거 후 요청
      const { creator, createdBy, ...filteredTask } = newTask;
      return createTask(filteredTask);
    },
    {
      onSuccess: (data) => {
        console.log("업무 생성:", data);
        queryClient.invalidateQueries(["tasks"]);
      },
      onError: (error) => {
        console.error("업무 생성 에러:", error);
      },
    }
  );
  
  // 업무 생성
  const handleCreateTask = methods.handleSubmit(async (formData) => {
    try {
      await createTaskMutation.mutateAsync(formData);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  });

  // 수정 mutation
  const updateTaskMutation = useMutation(
    (updatedData: Partial<TaskInfoValues>) => {
      // createdBy 필드 제거 후 요청
      const { createdBy, ...filteredUpdate } = updatedData;
      return updateTask(tid as string, filteredUpdate);
    },      {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["taskInfo", tid]); 
        if (closeTab) closeTab(); // 수정 성공 시 탭 닫기
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  
  // 업무 수정
  const handleUpdateTask = methods.handleSubmit(async (formData) => {
    try {
      const updatedData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => {
          const typedKey = key as keyof TaskInfoValues;
          let prevValue = taskData?.data?.[typedKey];
          
          // 날짜 포맷 변환
          if ((typedKey === "startDate" || typedKey === "dueDate") && typeof prevValue === "string") {
            prevValue = prevValue.split("T")[0];
          }

          // 담당자 문자열 비교
          if (Array.isArray(value) && Array.isArray(prevValue)) {
            return JSON.stringify(value) !== JSON.stringify(prevValue);
          }

        return value !== undefined && value !== prevValue;
      })
    ) as Partial<TaskInfoValues>;
      
    
    if (updatedData.startDate) {
      updatedData.startDate = updatedData.startDate.split("T")[0]; 
    }
    if (updatedData.dueDate) {
      updatedData.dueDate = updatedData.dueDate.split("T")[0];
    }
    
    delete updatedData.createdBy;

      if (Object.keys(updatedData).length > 0) {

        // 프로젝트 id 추가
        if (!updatedData.project) {
          updatedData.project = projectId;
        }

        await updateTaskMutation.mutateAsync(updatedData);
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  });
    

  return { ...methods, handleCreateTask, userInfo, createTaskMutation, handleUpdateTask};
};

export default useTask;