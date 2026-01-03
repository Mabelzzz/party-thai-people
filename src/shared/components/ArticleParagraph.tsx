import { ArticleProps } from '@/shared/types/article.types'

function ArticleParagraph({ children, className, ...props }: ArticleProps) {
   return (
      <p className={`tracking-wide leading-[1.5] text-pur-600/70 ${className ?? ''}`} {...props}>
         {children}
      </p>
   )
}

export default ArticleParagraph
