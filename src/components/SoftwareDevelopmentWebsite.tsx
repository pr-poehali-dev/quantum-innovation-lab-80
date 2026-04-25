import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, ChevronRight, Menu, X, ShoppingBag, Heart, Star, Filter } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { GridMotion } from "./ui/grid-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

function AnimatedGroup({
  children,
  className,
  variants,
}: {
  children: React.ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
}) {
  const containerVariants = variants?.container || defaultContainerVariants
  const itemVariants = variants?.item || defaultItemVariants

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className={cn(className)}>
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const menuItems = [
  { name: "Коллекция", href: "#products" },
  { name: "О нас", href: "#about" },
  { name: "Материалы", href: "#materials" },
  { name: "Контакты", href: "#contact" },
]

const products = [
  {
    id: 1,
    name: "Сумка-тоут из натуральной кожи",
    description: "Просторная и элегантная сумка, сшитая вручную из итальянской кожи. Идеальна для работы и прогулок.",
    price: "8 900 ₽",
    category: "Тоут",
    image: "https://picsum.photos/seed/bag1/400/320",
    badge: "Хит продаж",
  },
  {
    id: 2,
    name: "Вязаная сумка-мешок",
    description: "Лёгкая летняя сумка из хлопковой нити ручной вязки. Вместительная и стильная для любого образа.",
    price: "3 200 ₽",
    category: "Мешок",
    image: "https://picsum.photos/seed/bag2/400/320",
    badge: "Новинка",
  },
  {
    id: 3,
    name: "Кожаный кроссбоди",
    description: "Компактная сумка через плечо из натуральной замши. Регулируемый ремень, надёжная фурнитура.",
    price: "6 400 ₽",
    category: "Кроссбоди",
    image: "https://picsum.photos/seed/bag3/400/320",
    badge: "Ручная работа",
  },
  {
    id: 4,
    name: "Плетёная корзина-шопер",
    description: "Экологичная сумка из натурального ротанга. Плетение выполнено вручную местными мастерами.",
    price: "4 100 ₽",
    category: "Шопер",
    image: "https://picsum.photos/seed/bag4/400/320",
    badge: "Эко",
  },
  {
    id: 5,
    name: "Клатч из тиснёной кожи",
    description: "Изысканный вечерний клатч с тиснением под крокодила. Магнитная застёжка, внутренний карман.",
    price: "5 700 ₽",
    category: "Клатч",
    image: "https://picsum.photos/seed/bag5/400/320",
    badge: "Ручная работа",
  },
  {
    id: 6,
    name: "Рюкзак из мягкой кожи",
    description: "Стильный городской рюкзак ручной работы. Натуральная телячья кожа, хлопковая подкладка.",
    price: "12 500 ₽",
    category: "Рюкзак",
    image: "https://picsum.photos/seed/bag6/400/320",
    badge: "Премиум",
  },
  {
    id: 7,
    name: "Льняная пляжная сумка",
    description: "Большая летняя сумка из натурального льна с деревянными ручками. Помещает всё необходимое.",
    price: "2 800 ₽",
    category: "Пляжная",
    image: "https://picsum.photos/seed/bag7/400/320",
    badge: "Лето 2026",
  },
  {
    id: 8,
    name: "Поясная сумка из нубука",
    description: "Удобная поясная сумка из нежного нубука. Компактная, но вмещает телефон, карты и ключи.",
    price: "3 900 ₽",
    category: "Поясная",
    image: "https://picsum.photos/seed/bag8/400/320",
    badge: "Тренд",
  },
]

const categories = ["Все", "Тоут", "Кроссбоди", "Рюкзак", "Клатч", "Шопер", "Мешок", "Пляжная", "Поясная"]

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header>
      <nav data-state={menuState && "active"} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            "mx-auto mt-1 max-w-4xl px-4 transition-all duration-300 lg:px-8",
            isScrolled && "bg-background/50 max-w-3xl rounded-2xl border backdrop-blur-lg lg:px-4",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-0">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </a>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Закрыть меню" : "Открыть меню"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button variant="outline" size="sm" className={cn(isScrolled && "lg:hidden")}>
                  <span>Избранное</span>
                </Button>
                <Button
                  size="sm"
                  className={cn(
                    isScrolled
                      ? "lg:inline-flex bg-[#8B4513] hover:bg-[#6B3410]"
                      : "hidden bg-[#8B4513] hover:bg-[#6B3410]",
                  )}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Корзина</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="bg-[#8B4513] rounded-lg p-2">
        <ShoppingBag className="h-6 w-6 text-white" />
      </div>
      <span className="text-xl font-bold">Сумки ручной работы</span>
    </div>
  )
}

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [liked, setLiked] = React.useState(false)

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white dark:bg-card rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-[#8B4513] text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 bg-white/90 dark:bg-background/90 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={cn("h-4 w-4 transition-colors", liked ? "fill-red-500 text-red-500" : "text-stone-400")}
          />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="bg-stone-100/90 dark:bg-stone-800/90 text-stone-600 dark:text-stone-300 text-xs px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-foreground text-base leading-tight mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1.5">(12)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#8B4513]">{product.price}</span>
          <Button
            size="sm"
            className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-xl px-4"
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
            В корзину
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

const gridItems = [
  "https://picsum.photos/seed/leather1/400/300",
  "https://picsum.photos/seed/bag_craft/400/300",
  "https://picsum.photos/seed/handbag1/400/300",
  "https://picsum.photos/seed/purse1/400/300",
  "https://picsum.photos/seed/tote1/400/300",
  "https://picsum.photos/seed/clutch1/400/300",
  "https://picsum.photos/seed/leather2/400/300",
  "https://picsum.photos/seed/bag_stitch/400/300",
  "https://picsum.photos/seed/handmade1/400/300",
  "https://picsum.photos/seed/woven1/400/300",
  "https://picsum.photos/seed/leather3/400/300",
  "https://picsum.photos/seed/purse2/400/300",
  "https://picsum.photos/seed/handbag2/400/300",
  "https://picsum.photos/seed/tote2/400/300",
  "https://picsum.photos/seed/backpack1/400/300",
  "https://picsum.photos/seed/clutch2/400/300",
  "https://picsum.photos/seed/bag_handcraft/400/300",
  "https://picsum.photos/seed/leather4/400/300",
  "https://picsum.photos/seed/woven2/400/300",
  "https://picsum.photos/seed/purse3/400/300",
  "https://picsum.photos/seed/handbag3/400/300",
  "https://picsum.photos/seed/tote3/400/300",
  "https://picsum.photos/seed/crossbody1/400/300",
  "https://picsum.photos/seed/leather5/400/300",
  "https://picsum.photos/seed/bag_artisan/400/300",
  "https://picsum.photos/seed/purse4/400/300",
]

export default function SoftwareDevelopmentWebsite() {
  const [activeCategory, setActiveCategory] = React.useState("Все")

  const filteredProducts = activeCategory === "Все"
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(20,60%,40%,.08)_0,hsla(20,60%,35%,.02)_50%,hsla(20,60%,30%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(20,60%,40%,.06)_0,hsla(20,60%,35%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        </div>

        {/* Hero */}
        <section>
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#products"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">Каждая сумка создана с душой и вниманием к деталям</span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                        <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                      </div>
                    </div>
                  </a>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    Коллекция сумок{" "}
                    <span className="inline-block text-[#8B4513] text-6xl md:text-7xl xl:text-[5.25rem] font-semibold">
                      ручной работы
                    </span>
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                    Уникальные модели из натуральных материалов. Каждая сумка — это произведение искусства, созданное
                    мастером с многолетним опытом. Натуральная кожа, лён, хлопок и ротанг.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div key={1} className="bg-[#8B4513]/10 rounded-[14px] border border-[#8B4513]/20 p-0.5">
                    <Button size="lg" className="rounded-xl px-5 text-base bg-[#8B4513] hover:bg-[#6B3410] text-white">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      <span className="text-nowrap">Смотреть коллекцию</span>
                    </Button>
                  </div>
                  <Button key={2} size="lg" variant="ghost" className="h-10.5 rounded-xl px-5 hover:text-[#8B4513]">
                    <span className="text-nowrap">О мастерской</span>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-stone-300 p-4 shadow-lg shadow-[#8B4513]/10 ring-1">
                  <div className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-950 dark:to-amber-950 aspect-[15/8] relative rounded-2xl border border-stone-200 overflow-hidden">
                    <GridMotion items={gridItems} gradientColor="rgba(139, 69, 19, 0.08)" className="h-full w-full" />
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <section className="bg-background pb-16 pt-16 md:pb-20">
                <div className="group relative m-auto max-w-5xl px-6">
                  <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <a href="#products" className="block text-sm duration-150 hover:opacity-75 text-[#8B4513]">
                      <span>Смотреть всю коллекцию</span>
                      <ChevronRight className="ml-1 inline-block size-3" />
                    </a>
                  </div>
                  <div className="group-hover:opacity-20 transition-opacity duration-500">
                    <p className="text-center text-sm text-muted-foreground mb-8">Нас выбирают ценители качества по всей России</p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
                      {["500+ довольных клиентов", "100% натуральные материалы", "Ручная работа", "Доставка по России", "Гарантия качества"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-muted-foreground">
                          <div className="h-2 w-2 rounded-full bg-[#8B4513]" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedGroup>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="bg-[#f8f5f0] dark:bg-stone-950/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                Последние новости за <span className="text-[#8B4513]">неделю</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Уникальные модели, созданные с душой и вниманием к деталям
              </p>

              {/* Filters */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground mr-1" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                      activeCategory === cat
                        ? "bg-[#8B4513] text-white shadow-md"
                        : "bg-white dark:bg-stone-800 text-muted-foreground border border-stone-200 dark:border-stone-700 hover:border-[#8B4513] hover:text-[#8B4513]",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 20px 60px" }}>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </div>

            {/* Load More */}
            <div className="text-center mt-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 border-[#8B4513]/30 hover:border-[#8B4513] hover:text-[#8B4513]"
              >
                Загрузить ещё
              </Button>
            </div>
          </div>
        </section>

        {/* About / Features */}
        <section id="about" className="bg-muted/30 py-16 md:py-32 dark:bg-transparent">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                Почему выбирают <span className="text-[#8B4513]">нашу мастерскую</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Каждое изделие создаётся вручную с любовью и профессиональным подходом к каждой детали.
              </p>
            </div>
            <Card className="mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 border-stone-200 *:text-center md:mt-16 md:max-w-full md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                    <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
                    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l border-stone-200">
                      <span className="text-2xl">🧵</span>
                    </div>
                  </div>
                  <h3 className="mt-6 font-medium">Ручная работа</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Каждая сумка сшита вручную опытным мастером. Никакого массового производства — только индивидуальный подход.
                  </p>
                </CardContent>
              </div>

              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                    <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
                    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l border-stone-200">
                      <span className="text-2xl">🌿</span>
                    </div>
                  </div>
                  <h3 className="mt-6 font-medium">Натуральные материалы</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Используем только натуральную кожу, лён, хлопок и ротанг. Никакой синтетики — только экологичные материалы.
                  </p>
                </CardContent>
              </div>

              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                    <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
                    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l border-stone-200">
                      <span className="text-2xl">🎁</span>
                    </div>
                  </div>
                  <h3 className="mt-6 font-medium">Индивидуальный заказ</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Создаём сумки на заказ по вашим пожеланиям: выбор цвета, размера, фурнитуры и отделки.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-background border-t border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <Logo />
              <p className="text-sm text-muted-foreground max-w-xs">
                Мастерская сумок ручной работы. Создаём уникальные изделия из натуральных материалов с 2018 года.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Коллекция</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Кожаные сумки", "Вязаные модели", "Летняя коллекция", "Новинки"].map((item) => (
                  <li key={item}><a href="#products" className="hover:text-[#8B4513] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Информация</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["О мастерской", "Доставка и оплата", "Возврат", "Уход за изделиями"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-[#8B4513] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Контакты</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Индивидуальные заказы</li>
                <li>Доставка по всей России</li>
                <li className="pt-2">
                  <Button className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-xl">
                    Написать мастеру
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Сумки ручной работы. Все права защищены.</p>
            <p className="text-sm text-muted-foreground">Сделано с ❤️ для ценителей качества</p>
          </div>
        </div>
      </footer>
    </>
  )
}
