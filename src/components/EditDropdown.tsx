import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditIcon, Ellipsis, Trash2 } from "lucide-react"
import { useState } from "react"

type Props = {
    onEdit: () => void,
    onDelete: () => void,
}

export function EditDropdown({ onEdit, onDelete }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
                    <EditIcon/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={onDelete}>
                    <Trash2/>
                    Delete
                </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
