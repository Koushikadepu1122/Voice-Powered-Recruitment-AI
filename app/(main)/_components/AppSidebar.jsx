'use client'
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/constants"
import Link from "next/link"
import { Plus } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function AppSidebar() {

    const path = usePathname()
    console.log(path)
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-4'>
        <Image src = {'/logos.png'} alt ='logo' width ={200} height={100}
        className='w-[200px]' />

        <Button className='w-full mt-5'><Plus/>Create New Interview</Button>

      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SidebarOptions.map((option,index) =>(
                        <SidebarMenuItem key={index} className='p-1'>
                            <SidebarMenuButton asChild className={`p-4 ${path == option.path && 'bg-gray-300'}`}>
                                <Link href={option.path}>
                                    <option.icon className={`${path == option.path && 'text-primary'}`}/>
                                    <span className={`text-[16px] font-medium ${path == option.path && 'text-primary'}`}>
                                    {option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
        
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}