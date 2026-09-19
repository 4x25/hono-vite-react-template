import { Moon, Sun, Sparkles, LogoGithub } from "@gravity-ui/icons";
import { Button, Link } from "@heroui/react";
import { NavLink, Outlet, Link as RouterLink } from "react-router";
import { useTheme } from "../hooks/useTheme";

const githubUrl = "https://github.com/4x25/hono-vite-react-template";

export default function AppLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-separator">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 sm:grid-cols-[1fr_auto_1fr]">
          <RouterLink to="/" className="flex w-fit items-center gap-2 text-lg font-semibold" aria-label="LLM Gallery 主页">
            <Sparkles width={24} height={24} aria-hidden="true" />
            <span>LLM Gallery</span>
          </RouterLink>
          <nav aria-label="主导航" className="order-3 col-span-2 flex justify-center gap-2 sm:order-none sm:col-span-1">
            <NavLink to="/" end className={({ isActive }) => `button button--sm ${isActive ? "button--secondary" : "button--ghost"}`}>
              模型列表
            </NavLink>
            <NavLink to="/models/gpt-demo" className={({ isActive }) => `button button--sm ${isActive ? "button--secondary" : "button--ghost"}`}>
              详情示例
            </NavLink>
          </nav>
          <Button isIconOnly variant="ghost" className="justify-self-end" aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"} onPress={toggleTheme}>
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
        <Outlet />
      </main>
      <footer className="border-t border-separator">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm">
          <span className="text-muted">LLM Gallery · 模型探索，从这里开始</span>
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2 break-all">
            <LogoGithub className="shrink-0" aria-hidden="true" />
            github.com/4x25/hono-vite-react-template
          </Link>
        </div>
      </footer>
    </div>
  );
}
