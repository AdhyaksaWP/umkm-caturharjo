import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditIcon, Ellipsis, Trash2 } from "lucide-react"

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
                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={onDelete}>
                    <Trash2 className="text-red-500"/>
                    Delete
                </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
