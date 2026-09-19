import { ArrowLeft, ArrowUpRightFromSquare, Check } from "@gravity-ui/icons";
import { Card, Chip, Link as HeroLink } from "@heroui/react";
import { Link, useParams } from "react-router";
import { models } from "../../data/models";
import NotFoundPage from "../NotFound";

export default function ModelDetailPage() {
  const { modelId } = useParams();
  const model = models.find((item) => item.id === modelId);
  if (!model) return <NotFoundPage />;
  const { Icon } = model;

  return (
    <div className="space-y-8">
      <Link className="link gap-2" to="/"><ArrowLeft aria-hidden="true" />返回模型列表</Link>
      <section className="flex flex-wrap items-center gap-5">
        <Icon size={56} aria-hidden="true" />
        <div className="space-y-2">
          <p className="text-sm text-muted">{model.provider}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{model.name}</h1>
          <p className="text-muted">{model.description}</p>
        </div>
      </section>
      <div className="grid items-start gap-5 md:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <Card>
            <Card.Header><Card.Title render={(props) => <h2 {...props} />}>模型介绍</Card.Title></Card.Header>
            <Card.Content><p className="leading-7 text-muted">{model.overview}</p></Card.Content>
          </Card>
          <Card>
            <Card.Header><Card.Title render={(props) => <h2 {...props} />}>你可以用它做什么</Card.Title></Card.Header>
            <Card.Content>
              <ul className="space-y-4">{model.scenarios.map((scenario) => <li key={scenario} className="flex items-start gap-3"><Check className="mt-1 shrink-0 text-success" aria-hidden="true" /><span>{scenario}</span></li>)}</ul>
            </Card.Content>
          </Card>
        </div>
        <Card>
          <Card.Header><Card.Title render={(props) => <h2 {...props} />}>模型信息</Card.Title><Card.Description>用于页面展示的示例模型</Card.Description></Card.Header>
          <Card.Content className="space-y-5">
            <dl className="space-y-3">
              <div className="flex justify-between gap-4"><dt className="text-muted">提供商</dt><dd>{model.provider}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">类型</dt><dd>大语言模型</dd></div>
            </dl>
            <div className="flex flex-wrap gap-2">{model.tags.map((tag) => <Chip key={tag} size="sm">{tag}</Chip>)}</div>
          </Card.Content>
          <Card.Footer><HeroLink href={model.website} target="_blank" rel="noopener noreferrer" className="gap-2">访问提供商官网<ArrowUpRightFromSquare aria-hidden="true" /></HeroLink></Card.Footer>
        </Card>
      </div>
    </div>
  );
}
