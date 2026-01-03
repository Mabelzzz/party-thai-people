import { ArticleProps } from '@/shared/types/article.types'

function Heading_1({ children, className, ...props }: ArticleProps) {
   return (
      <h1 className={`text-4xl text-ora-100 leading-[1.5] ${className ?? ''}`} {...props}>
         {children}
      </h1>
   )
}

export default Heading_1
