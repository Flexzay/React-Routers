import { useQuery } from "@tanstack/react-query";
import { getClient } from "../../../fake/fake-data";
import { useParams } from "react-router";
import { NoContactSelected } from "./NoContactSelected";
import { ContactInfoSkeleton } from "./ContactInfoSkeleton";
import { ContactInfo } from "./ContactInfo";

export const ContactDetail = () => {
  const { clientId } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ["contactDetail"],
    queryFn: () => getClient(clientId ?? ""),
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000, 
  });

  if (!clientId) {
    return <NoContactSelected />;
  }

  if (isLoading) {
    return <ContactInfoSkeleton />;
  }

  if (client) {
    return <ContactInfo client={client} />;
  }

  return <div>Cliente no encontrado</div>;
};
