import { useQuery } from "@tanstack/react-query";
import questionsService from "@/services/questionsService";

export const useQuestions = () => {
  const questionsQuery = useQuery({
    queryKey: ["questions"],
    queryFn: () => questionsService.getAllData(),
  });

  return {
    questionsQuery,
  };
};
