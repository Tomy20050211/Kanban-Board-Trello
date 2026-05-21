import type{ CardTaskProps } from "../../types/cardTask.type"

export function CardTask({title, description}: CardTaskProps){

    return(
       <div>
          <h1>
            {title}
          </h1>
          <p>
            {description}
          </p>
       </div>
    )
}