import meetingService from "@/services/meetingService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type QueryType = "meetingsQuery" | "meetingQuery";

type HookProps = {
  id?: string;
  params?: {
    idcondominium: string;
    // q?: string;
    // limitResults?: number;
  };
  query?: QueryType[];
};
export const useMeetings = (props: HookProps) => {
  if (!props?.id && !props?.params) {
    throw new Error("Id or idcondominium is missing");
  }

  const { params, id } = props;

  const meetingsQuery = useQuery({
    queryKey: ["meetings", params],
    queryFn: () => meetingService.getAllData(props.params ? params : undefined),
    enabled: !!props.query?.includes("meetingsQuery"),
  });

  const meetingQuery = useQuery({
    queryKey: ["meetings", id],
    queryFn: () => meetingService.getData(id || ""),
    enabled: !!id && !!props.query?.includes("meetingQuery"),
  });

  return {
    meetingsQuery,
    meetingQuery,
  };
};
