import { Button } from "../../components/ui/button";
import { NavLink } from "react-router";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../fake/fake-data";

export const ContactList = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            {isLoading && <div>Loading...</div>}

            {clients?.map((clients) => (
              <NavLink
                to={`/chat/${clients.id}`}
                className={({ isActive }) =>
                  `w-full flex items-center mt-3 ${
                    isActive
                      ? "font-bold text-blue-600"
                      : "text-gray-700 hover:bg-gray-100 rounded-md"
                  } px-2 py-1`
                }
              >
                <div className="h-6 w-6 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                  {clients.name.charAt(0)}
                </div>
                <span className="text-gray-500">{clients.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
