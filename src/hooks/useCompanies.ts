import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import companiesService from "../services/companiesService";
import onUploadImage from "../services/storageService";

type Props = {
  enabled?: boolean;
  id?: string;
};

export const useCompanies = ({ id = undefined }: Props = {}) => {
  const client = useQueryClient();

  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: () => companiesService.getAllData(),
  });

  // const companyQuery = useQuery({
  //   queryKey: ["companies", id],
  //   queryFn: () => companiesService.getData(id || ""),
  //   enabled: !!id,
  // });

  return {
    companiesQuery,
    //companyQuery,
  };
};
