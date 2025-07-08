import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, Camera, MoreVertical, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link} from "react-router-dom"

export function ObjectPreviewCard({ object }) {
  const getTypeColor = (type) => {
    switch (type) {
      case "OBJ":
        return "bg-blue-100 text-blue-800"
      case "GLB":
        return "bg-green-100 text-green-800"
      case "GLTF":
        return "bg-purple-100 text-purple-800"
      case "FBX":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{object.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className={`text-xs ${getTypeColor(object.type)}`}>
                {object.type}
              </Badge>
              <span className="text-xs text-gray-500">{object.size}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
     
        </div>

        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Vertices:</span>
            <span className="font-medium">{object.vertices}</span>
          </div>
          <div className="flex justify-between">
            <span>Faces:</span>
            <span className="font-medium">{object.faces}</span>
          </div>
          <div className="flex justify-between">
            <span>Uploaded:</span>
            <span className="font-medium">{new Date(object.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/model/${object.id}`}>
          <Button size="sm" className="flex-1 gap-1 bg-gray-900 hover:bg-gray-800">
            <Eye className="h-3 w-3" />
            View
          </Button>
        </Link>
        <Button size="sm" variant="outline" className="gap-1 bg-transparent">
          <Camera className="h-3 w-3" />
          Save State
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
