export interface ProductProps {
    id: string
    name: string
    size?: string
    color?: string
  }
  
  export class Product {
    private props: ProductProps
  
    constructor(props: ProductProps) {
      this.props = props
    }
  
    get id(): string {
      return this.props.id
    }
  
    get name(): string {
      return this.props.name
    }
  
    set name(newName: string) {
      if (newName.trim().length === 0) {
        throw new Error("Nome nao pode ser vazio")
      }
      this.props.name = newName
    }
  
    get size(): string | undefined {
      return this.props.size
    }
    set size(s: string | undefined) {
      this.props.size = s
    }
  
    get color(): string | undefined {
      return this.props.color
    }
    set color(c: string | undefined) {
      this.props.color = c
    }
  }
  