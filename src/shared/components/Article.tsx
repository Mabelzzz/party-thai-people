import { ArticleProps } from '@/shared/types/article.types'

function Article({ children, className, ...props }: ArticleProps) {
   return (
      <article className={`space-y-4 ${className ?? ''}`} {...props}>
         {children}
      </article>
   )
}

export default Article
