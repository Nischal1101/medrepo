import { AvatarImage, AvatarFallback, Avatar } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogoutAvatar = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-8 rounded-full">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="size-8 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              type="submit"
              className="mt-1"
              variant={"ghost"}
              onClick={async (e) => {
                e.preventDefault();
                await signOut();
              }}
            >
              logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LogoutAvatar;
