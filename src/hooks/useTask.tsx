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
  startDate: z.date().optional(),
  dueDate: z.date().optional(),
  createdBy: z.string(),
  project: z.string(),
  assignedTo: z.array(z.string()).optional(),
});

export interface TaskInfoValues extends z.infer<typeof taskSchema> {}

export const useTask = (tid: string | null, isCreate: boolean) => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery(["userInfo"], () => fetchUserInfo());

  const methods = useForm<TaskInfoValues>({
    defaultValues: {
      title: "",
      description: "",
      isDaily: false,
      status: "To Do",
      projectScope: "Public",
      priority: 0,
      startDate: undefined,
      dueDate: undefined,
      createdBy: "",
      project: "679aedec4f051a6eaac0204c",
      assignedTo: [],
    },
    resolver: zodResolver(taskSchema),
  });

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

  // 업무 상세
  const { isLoading } = useQuery(
    ["taskInfo", tid],
    () => fetchTaskInfo(tid as string),
    {
      enabled: !isCreate && tid !== null,
      onSuccess: (data) => {
        if (data) {
          methods.reset({
            status: data.status || "To Do",
            projectScope: data.projectScope || "Public",
            priority: data.priority || 0,
            startDate: data.startDate || undefined,
            dueDate: data.dueDate || undefined,
            createdBy: data.createdBy || "",
            project: data.project || "",
            title: data.title || "",
            description: data.description || "",
            assignedTo: data.assignedTo || [],
            isDaily: data.isDaily || false,
          });
        }
      },
    }
  );

  return { ...methods, handleCreateTask, userInfo, createTaskMutation };
};

export default useTask;