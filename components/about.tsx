import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import {
  ModalContent,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
} from "./ui/modal-drawer";
import { useMediaQuery } from "@/utils/media-query";
import { Drawer } from "vaul";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function About() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="absolute md: top-4 right-4 ">
        <Dialog>
          <DialogTrigger>?</DialogTrigger>
          <DialogContent>
            <DialogTitle>About</DialogTitle>

            <div>
              <p className="text-primary/75">
                This is a game inspired by the first program I created on my
                own. It was a Python CLI Game where you could guess a random
                number.
              </p>
              <p className="text-primary/75">
                I then later moved on to learning web development and thought it
                would be fun to recreate with the new skills I&apos;ve learned
                and to learn new ones. This app is built with the popular MERN
                stack which was my first time using it.
              </p>
            </div>
            <div className="p-4  mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
                <Link
                  className="flex items-center gap-2  text-xs text-primary/75"
                  href="https://c-g.dev"
                  target="__blank"
                >
                  Portfolio <ExternalLink size={12} />
                </Link>
                <Link
                  target="__blank"
                  className="flex items-center gap-2  text-xs text-primary/75"
                  href="https://github.com/colinguinane1/num-game-front-end"
                >
                  <BsGithub /> Front-End
                </Link>
                <Link
                  target="__blank"
                  className="flex items-center gap-2  text-xs text-primary/75"
                  href="https://github.com/colinguinane1/num_game_back-end"
                >
                  <BsGithub /> Back-End
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="absolute md: top-4 right-4 ">
      <Drawer.Root>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          ?
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-card z-10 flex flex-col rounded-t-[10px] mt-24 h-fit lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
            <div className="justify-between  bg-card rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="max-w-md p-4 mx-auto space-y-4">
                <div
                  aria-hidden
                  className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
                />
                <Drawer.Title className="font-medium mb-4 text-primary">
                  About
                </Drawer.Title>
                <p className="text-primary/50">
                  This is a game inspired by the first program I created on my
                  own. It was a Python CLI Game where you could guess a random
                  number.
                </p>
                <p className="text-primary/50">
                  I then later moved on to learning web development and thought
                  it would be fun to recreate with the new skills I&apos;ve
                  learned and to learn new ones. This app is built with the
                  popular MERN stack which was my first time using it.
                </p>
              </div>
              <div className="p-4 bg-card/75 border-t  mt-auto">
                <div className="flex gap-6 justify-end max-w-md mx-auto">
                  <Link
                    target="_blank    "
                    className="flex items-center gap-2  text-xs text-gray-600"
                    href="https://c-g.dev"
                  >
                    Portfolio <ExternalLink size={12} />
                  </Link>
                  <Link
                    target="__blank"
                    className="flex items-center gap-2  text-xs text-gray-600"
                    href="https://github.com/colinguinane1/num-game-front-end"
                  >
                    <BsGithub /> Front-End
                  </Link>
                  <Link
                    target="__blank"
                    className="flex items-center gap-2  text-xs text-gray-600"
                    href="https://github.com/colinguinane1/num_game_back-end"
                  >
                    <BsGithub /> Back-End
                  </Link>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
