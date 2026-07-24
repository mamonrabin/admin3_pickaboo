import { TGroup } from "@/types";
import {
  LayoutGrid,
  ShoppingCart,
  TicketPercent,
  Images,
  Star,
  Users,
  FileText,
  Info,
  Phone,
  Share2,
  Image,
  ClipboardList,
  Layout,
  FolderTree,
  Badge,
  Sparkles,
  Package,
} from "lucide-react";

export function getMenuList(pathname: string): TGroup[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Overview",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/new_order",
          label: "New Orders",
          active: pathname.includes("/new_order"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/order-list",
          label: "Orders",
          active: pathname.includes("/order-list"),
          icon: ClipboardList,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/category",
          label: "Category",
          active: pathname.includes("/category"),
          icon: FolderTree,
          submenus: [
            {
              href: "/category/category",
              label: "Category",
              active: pathname === "/category/category",
            },
            {
              href: "/category/subcategory",
              label: "Subcategory",
              active: pathname === "/category/subcategory",
            },
          ],
        },
        {
          href: "/brand",
          label: "Brand",
          active: pathname.includes("/brand"),
          icon: Badge,
          submenus: [],
        },
        {
          href: "/products",
          label: "Products",
          active: pathname.includes("/products"),
          icon: Package,
          submenus: [],
        },
        {
          href: "/coupon",
          label: "Coupon",
          active: pathname.includes("/coupon"),
          icon: TicketPercent,
          submenus: [],
        },
        {
          href: "/campaign",
          label: "Campaign",
          active: pathname.includes("/campaign"),
          icon: Sparkles,
          submenus: [],
        },
        {
          href: "/user",
          label: "Customer",
          active: pathname.includes("/user"),
          icon: Users,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Pages",
      menus: [
        {
          href: "/banners",
          label: "Banners",
          active: pathname.includes("/banners"),
          icon: Images,
          submenus: [],
        },
        {
          href: "/policy",
          label: "Policy",
          active: pathname.includes("/policy"),
          icon: FileText,
          submenus: [],
        },
        {
          href: "/about",
          label: "About",
          active: pathname.includes("/about"),
          icon: Info,
          submenus: [],
        },
        {
          href: "/contact",
          label: "Contact",
          active: pathname.includes("/contact"),
          icon: Phone,
          submenus: [],
        },
        {
          href: "/social",
          label: "Social",
          active: pathname.includes("/social"),
          icon: Share2,
          submenus: [],
        },
        {
          href: "/logo",
          label: "Set Logo",
          active: pathname.includes("/logo"),
          icon: Image,
          submenus: [],
        },
        {
          href: "/product-review",
          label: "Product Review",
          active: pathname.includes("/product-review"),
          icon: Star,
          submenus: [],
        },
        {
          href: "/home_controll",
          label: "Home Page Control",
          active: pathname.includes("/home_controll"),
          icon: Layout,
          submenus: [],
        },
      ],
    },
  ];
}
