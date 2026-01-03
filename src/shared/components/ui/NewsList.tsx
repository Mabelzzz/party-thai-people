import { News } from '@/shared/types/news.types'
import NewsCard from '@/shared/components/ui/NewsCard'

interface NewsListProps {
  data: News[];
}

function NewsList({ data }: NewsListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
}

export default NewsList