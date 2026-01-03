import { ArticleProps } from '@/shared/types/article.types'

function ArticleHeading({ children, className, ...props }: ArticleProps) {
   return (
      <h2 className={`text-xl font-semibold ${className ?? ''}`} {...props}>
         {children}
      </h2>
   )
}

export default ArticleHeading
