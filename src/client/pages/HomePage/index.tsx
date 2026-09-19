import { useState } from "react";
import { useDebounce } from "ahooks";
import { ArrowRight, Magnifier } from "@gravity-ui/icons";
import { Button, Card, Chip, Input, Label, TextField } from "@heroui/react";
import { Link } from "react-router";
import { models } from "../../data/models";

const providers = ["全部", ...new Set(models.map((model) => model.provider))];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("全部");
  const search = useDebounce(query.trim().toLowerCase(), { wait: 200 });
  const filtered = models.filter((model) =>
    (provider === "全部" || provider === model.provider) &&
    [model.name, model.provider, ...model.tags].join(" ").toLowerCase().includes(search),
  );

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <Chip size="sm" variant="soft">模型目录</Chip>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">发现你的下一个 AI 助手</h1>
        <p className="text-muted">浏览不同的模型，找到适合你的对话、写作与开发伙伴。</p>
      </section>
      <section aria-label="搜索与筛选" className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <TextField className="w-full sm:max-w-sm" value={query} onChange={setQuery}>
          <Label>搜索模型</Label>
          <Input placeholder="搜索名称、提供商或能力…" type="search" />
        </TextField>
        <div className="flex flex-wrap gap-2" role="group" aria-label="按提供商筛选">
          {providers.map((item) => (
            <Button key={item} size="sm" variant={provider === item ? "secondary" : "ghost"} aria-pressed={provider === item} onPress={() => setProvider(item)}>{item}</Button>
          ))}
        </div>
      </section>
      <p className="text-sm text-muted" role="status">共 {filtered.length} 个模型 · 示例内容</p>
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map(({ Icon, ...model }) => (
          <Card key={model.id}>
            <Card.Header className="gap-4">
              <div className="flex items-center justify-between gap-3">
                <Icon size={36} aria-hidden="true" />
                <Chip size="sm" variant="soft">{model.provider}</Chip>
              </div>
              <Card.Title render={(props) => <h2 {...props} />}>{model.name}</Card.Title>
              <Card.Description>{model.description}</Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-row flex-wrap gap-2">
              {model.tags.map((tag) => <Chip key={tag} size="sm">{tag}</Chip>)}
            </Card.Content>
            <Card.Footer>
              <Link className="link gap-2" to={`/models/${model.id}`} aria-label={`查看 ${model.name} 详情`}>查看详情 <ArrowRight aria-hidden="true" /></Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <Card className="items-center gap-3 py-12 text-center">
          <Magnifier width={28} height={28} aria-hidden="true" />
          <Card.Title>没有找到匹配的模型</Card.Title>
          <Card.Description>试试其他关键词，或清除筛选条件。</Card.Description>
          <Button variant="secondary" onPress={() => { setQuery(""); setProvider("全部"); }}>清除筛选</Button>
        </Card>
      )}
    </div>
  );
}
