/**
 * 公司 / 分组配置 —— 首页作品按此顺序分组展示
 * 在这里加一家公司，再给作品的 frontmatter 写上 company: '<id>' 即可
 */
export interface Company {
  id: string;
  name: string;
  icon?: string; // 28px 方形 logo，放 public/img/company/ 下，路径以 /img/company/ 开头
  period?: string; // 可选，任职时间段，如 '2024 - 至今'
  order: number;
}

export const companies: Company[] = [
  // ↓ 占位数据，改成你自己的真实经历
  { id: 'jiajiele', name: '驾捷乐', icon: '/img/company/jiajiele.png', order: 1 },
  { id: 'personal', name: '个人项目', icon: '/img/company/personal.png', order: 2 },
];
