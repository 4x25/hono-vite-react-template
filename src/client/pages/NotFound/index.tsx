import { ArrowLeft } from "@gravity-ui/icons";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-sm text-muted">404</p>
      <h1 className="text-3xl font-semibold">页面或模型不存在</h1>
      <p className="text-muted">这个地址可能已失效，回到列表继续探索吧。</p>
      <Link to="/" className="link gap-2"><ArrowLeft aria-hidden="true" />返回主页</Link>
    </section>
  );
}
