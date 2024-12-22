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


    return (
      <div className="absolute md: top-4 right-4 ">
        <Dialog>
          <DialogTrigger className="bg-card border rounded-full p-2 w-10 h-10 flex items-center justify-center">?</DialogTrigger>
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


