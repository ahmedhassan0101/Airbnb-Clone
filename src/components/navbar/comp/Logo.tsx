import Link from "next/link";
import { TentTree } from "lucide-react";
import { Button } from "../../ui/button";
export default function Logo() {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <TentTree className="w-6 h-6" />
      </Link>
    </Button>
  );
}
