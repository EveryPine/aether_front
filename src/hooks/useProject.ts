import { useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectList } from "../api/projectApi";

const projectSchema = z.object({
   _id: z.string(),
   status: z.string(),
   name: z.string().min(1, ""),
   description: z.string().min(1, "").optional(),
   scope: z.string(),
   priority: z.number(),
   startDate: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
   dueDate: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
});

export interface ProjectIinfoValues extends z.infer<typeof projectSchema> {}

const useProject = (teamId: string | null, isCreate: boolean) => {
    const [projects, setProjects] = useState<ProjectIinfoValues[]>([]);

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


    // 프로젝트 전체 리스트 조회
    const { data: projectData, isLoading } = useQuery(
        ["projectInfo", teamId],
        () => fetchProjectList(teamId as string),
        {
            enabled: !isCreate,  // 프로젝트 생성이 아닐 때만 조회 요청
            initialData: null,
        }
    );

    // 데이터를 가져오면 상태 업데이트
    useEffect(() => {
        if (projectData?.data) {
            setProjects(projectData.data);
        }
    }, [projectData]);

    return { ...methods, projects, isLoading };
}

export default useProject;