import { useQuery } from "@tanstack/react-query";

import announcementService from "../services/annoucementService";
import { IAnnouncement } from "../types/announcement/announcement";

type QueryType = "announcementsQuery" | "announcementQuery";

type HookProps = {
  id?: string;
  params: {
    idcondominium: string;
    //idhousing: string;
    // q?: string;
    // limitResults?: number;
  };
  query?: QueryType[];
};

// type PropsCreate = {
//   data: IAnnouncement;
//   file?: File[];
// };
// type PropsUpdate = {
//   data: Partial<IAnnouncement>;
//   file?: File[];
// };

export const useAnnouncement = (props: HookProps) => {
  //   const client = useQueryClient();

  if (!props?.id && !props?.params) {
    throw new Error("Id or idcondominium is missing");
  }

  const { params, id = undefined, query } = props;

  const announcementsQuery = useQuery({
    queryKey: ["announcements", params.idcondominium],
    queryFn: () => announcementService.getAllData(params),
    //staleTime: 1000 * 60 * 60,
    enabled: query?.includes("announcementsQuery"),
  });

  const announcementQuery = useQuery({
    queryKey: ["announcements", id],
    queryFn: () => announcementService.getData(id || ""),
    enabled: !!id,
  });

  return {
    announcementsQuery,
    announcementQuery,
  };
};
