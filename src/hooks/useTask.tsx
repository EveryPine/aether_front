import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTaskInfo } from "../api/taskApi";
import { fetchUserInfo } from "../api/userApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  title: z.string().min(1, "업무 제목을 입력해주세요."),
  description: z.string().min(1, "업무 설명을 입력해주세요."),
  isDaily: z.boolean(),
  status: z.string(),
  projectScope: z.string(),
  priority: z.number(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  createdBy: z.string(),
  project: z.string(),
  assignedTo: z.array(z.string()).optional(),
});

export interface TaskInfoValues extends z.infer<typeof taskSchema> {}

export const useTask = (tid: string | null, isCreate: boolean) => {
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
      priority: 0,
      startDate: "",
      dueDate: "",
      createdBy: "",
      project: "",
      assignedTo: [],
    },
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (taskData?.data) {
      methods.reset({
        title: taskData.data.title || "",
        description: taskData.data.description || "",
        isDaily: taskData.data.isDaily || false,
        status: taskData.data.status || "To Do",
        projectScope: taskData.data.projectScope || "Public",
        priority: taskData.data.priority || 0,
        startDate: taskData.data.startDate ? new Date(taskData.data.startDate).toISOString().split("T")[0] : "",
        dueDate: taskData.data.dueDate ? new Date(taskData.data.dueDate).toISOString().split("T")[0] : "",
        createdBy: taskData.data.createdBy || "",
        project: taskData.data.project || "",
        assignedTo: taskData.data.assignedTo || [],
      });
    }
  }, [taskData, methods])

  // 업무 생성 mutation
  const createTaskMutation = useMutation(
    (newTask: TaskInfoValues) => createTask(newTask),
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
    } catch (error) {
      console.log(error);
    }
  });

  return { ...methods, handleCreateTask, userInfo, createTaskMutation };
};

export default useTask;