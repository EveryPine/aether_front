import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const projectSchema = z.object({
   status: z.string(),
   name: z.string().min(1, ""),
   description: z.string().min(1, ""),
//   members: z.array(z.string()).optional(),
//   status: z.string(),
   scope: z.string(),
   priority: z.number(),
   startDate: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
   dueDate: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
});

export interface ProjectIinfoValues extends z.infer<typeof projectSchema> {}


const useProject = () => {

    const methods = useForm<ProjectIinfoValues>({
        defaultValues: {
            status: "To Do",
            name: "",
            description: "",
            scope: "Team",
            priority: 0,
            startDate: "",
            dueDate: "",
        },
        resolver: zodResolver(projectSchema),
      });


    return { ...methods };
}

export default useProject;