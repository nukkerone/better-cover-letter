'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Nav() {

  return <div className="flex py-4">
    <NavigationMenu className="ml-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="mailto:contact@rockgabi.com" className="px-4 py-2 text-sm font-medium">Contact</a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent className="r-0">
            <Link href="/billing" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full whitespace-nowrap')}>
                Billing
              </NavigationMenuLink>
            </Link>
            <Link href="/api/auth/signout" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full whitespace-nowrap')}>
                Sign-out
              </NavigationMenuLink>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
}