import React, { useMemo, useState } from 'react';
import { buildCatalogTree, catalogNodeIds, categoryExpansionPath } from '../data/catalogSections.js';

export function Cards({ items }) {
  return items.map((item, index) => {
    const label = item.status === 'completed' ? '已完成'
      : item.status === 'published' ? '公開連結'
      : item.status === 'concept' ? '構想中'
      : item.status || '公開摘要待補';
    return <article className="content-card" key={item.id || item.title}>
      <div className="card-top">
        <span className="eyebrow">{item.categoryLabel || String(index + 1).padStart(2, '0')}</span>
        <span className={`status ${['completed', 'published'].includes(item.status) ? 'done' : ''}`}>{label}</span>
      </div>
      {item.symbol && <div className="project-symbol" aria-hidden="true">{item.symbol}</div>}
      {item.englishTitle && <p className="project-english">{item.englishTitle}</p>}
      <h3>{item.title}</h3>
      {item.subtitle && <small className="project-subtitle">{item.subtitle}</small>}
      <p>{item.description}</p>
      {item.features && <p className="feature">{item.features}</p>}
      {item.thumbnail ? <img src={item.thumbnail} alt={`${item.title} 操作畫面`} />
        : !['concept', 'published'].includes(item.status) && <div className="preview-placeholder" aria-label="截圖待補">✧ <span>作品畫面・待補上</span></div>}
      {!!item.technologies?.length && <div className="tags">{item.technologies.map(t => <span key={t}>{t}</span>)}</div>}
      {item.url ? <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`開啟${item.title}（新分頁）`}>
        {item.linkLabel || (item.status === 'completed' ? '開始遊玩' : item.status === 'published' ? '開啟作品' : '開啟 Demo')} ↗
      </a> : item.features && <small>Demo 連結待補</small>}
    </article>;
  });
}

function CatalogBranch({ node, expanded, toggle, depth = 0 }) {
  return <details className="catalog-branch" open={expanded(node.id)} data-depth={depth}>
    <summary onClick={event => { event.preventDefault(); toggle(node.id); }}>
      <span className="branch-chevron" aria-hidden="true">›</span>
      <span className="branch-title">{node.title}</span>
      <span className="branch-count">{node.count} 件</span>
    </summary>
    <div className="branch-body">
      {node.children.map(child => <CatalogBranch key={child.id} node={child} expanded={expanded} toggle={toggle} depth={depth + 1} />)}
      <Cards items={node.items} />
    </div>
  </details>;
}

export default function PortfolioCatalog({ items, title, initialCategory = 'all' }) {
  const [query, setQuery] = useState('');
  const fullTree = useMemo(() => buildCatalogTree(items), [items]);
  const [openIds, setOpenIds] = useState(() => new Set(categoryExpansionPath(initialCategory, fullTree)));
  const [searchClosed, setSearchClosed] = useState(() => new Set());
  const tree = useMemo(() => buildCatalogTree(items, query), [items, query]);
  const searching = !!query.trim();
  const count = tree.reduce((total, node) => total + node.count, 0);
  const expanded = id => searching ? !searchClosed.has(id) : openIds.has(id);
  const toggle = id => {
    const update = searching ? setSearchClosed : setOpenIds;
    update(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const expandAll = () => { setOpenIds(new Set(catalogNodeIds(fullTree))); setSearchClosed(new Set()); };
  const collapseAll = () => { setOpenIds(new Set()); setSearchClosed(new Set(catalogNodeIds(tree))); };
  return <section className="portfolio-catalog" aria-label={title}>
    <div className="catalog-heading"><h3>{title}</h3><span>{items.length} 件</span></div>
    <label className="catalog-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setSearchClosed(new Set()); }} placeholder="搜尋作品或分類名稱" aria-label={`搜尋${title}`} /></label>
    <div className="catalog-toolbar"><span>依原網站分類，點選展開</span><div><button type="button" onClick={expandAll}>全部展開</button><button type="button" onClick={collapseAll}>全部收合</button></div></div>
    <p className="catalog-count" role="status" aria-live="polite">{searching ? '找到' : '共'} {count} 件{searching ? ` / ${items.length} 件` : '作品與內容'}</p>
    <div className="catalog-tree">{tree.map(node => <CatalogBranch key={node.id} node={node} expanded={expanded} toggle={toggle} />)}</div>
    {!count && <div className="catalog-empty"><span>✧</span><p>這個角落還沒有符合的作品。</p><button type="button" onClick={() => { setQuery(''); setSearchClosed(new Set()); }}>清除搜尋</button></div>}
  </section>;
}
