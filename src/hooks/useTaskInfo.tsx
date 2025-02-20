import { useForm } from "react-hook-form";

interface TaskInfoValues {
  status: string;
  visibility: string;
  priority: number;
  startDate: string;
  dueDate: string;
  name: string;
  position: string;
}

const useTaskInfo = () => {
  return useForm<TaskInfoValues>({
    defaultValues: {
      status: "pending",
      visibility: "public",
      priority: 1,
      startDate: "",
      dueDate: "",
      name: "최기수",
      position: "팀장",
    },
  });
};

export default useTaskInfo;