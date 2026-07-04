import { TGroup } from "@/types";
import {
  LayoutGrid,
  ScrollText,
  ShoppingCart,
  Shapes,
  Package2,
  TicketPercent,
  FlameKindling,
  Images,
  Star,
} from "lucide-react";

export function getMenuList(pathname: string): TGroup[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/order-list",
          label: "Orders",
          active: pathname.includes("/order-list"),
          icon: ShoppingCart,
          submenus: [],
        },

        {
          href: "/category",
          label: "Category",
          active: pathname.includes("/category"),
          icon: Shapes,
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
          href: "/Size&Color",
          label: "Size & Color",
          active: pathname.includes("/Size&Color"),
          icon: Shapes,
          submenus: [
            {
              href: "/Size&Color/size",
              label: "Size",
              active: pathname === "/Size&Color/size",
            },
            {
              href: "/Size&Color/color",
              label: "Color",
              active: pathname === "/Size&Color/color",
            },
          ],
        },

        {
          href: "/brand",
          label: "Brand",
          active: pathname.includes("/brand"),
          icon: Package2,
          submenus: [],
        },
        {
          href: "/products",
          label: "Products",
          active: pathname.includes("/products"),
          icon: Package2,
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
          icon: FlameKindling,
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
          href: "/blogs",
          label: "blogs",
          active: pathname.includes("/blogs"),
          icon: ScrollText,
          submenus: [],
        },
        {
          href: "/product-review",
          label: "Product Review",
          active: pathname.includes("/product-review"),
          icon: Star,
          submenus: [],
        },
      ],
    },
  ];
}
