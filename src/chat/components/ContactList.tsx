import { Button } from "../../components/ui/button";
import { NavLink, useParams } from "react-router";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../fake/fake-data";

export const ContactList = () => {
  const { clientId } = useParams();

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="space-y-4 p-4">
        <h3 className="px-2 text-sm font-semibold">Contacts</h3>

        {isLoading && <div>Loading...</div>}

        <div className="space-y-1">
          {clients?.map((client) => {
            const isActive = clientId === (client.id);

            return (
              <NavLink
                key={client.id}
                to={`/chat/${client.id}`}
                className={`w-full flex items-center mt-3 px-2 py-1 rounded-md ${
                  isActive
                    ? "font-bold text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`h-6 w-6 mr-2 flex items-center justify-center rounded-full text-xs font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {client.name.charAt(0)}
                </div>

                <span className="text-gray-500">{client.name}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>

          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
