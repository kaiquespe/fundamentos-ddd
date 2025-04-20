import { Product } from "./product"

export interface InventoryItemProps {
  product: Product
  quantity: number
  reorderLevel: number
}

export class InventoryItem {
  private props: InventoryItemProps

  constructor(props: InventoryItemProps) {
    if (props.quantity < 0) throw new Error("Quantidade nao pode ser negativa")
    if (props.reorderLevel < 0) throw new Error("Quantidade minima nao pode ser negativo")
    this.props = props
  }

  get product(): Product {
    return this.props.product
  }

  get quantity(): number {
    return this.props.quantity
  }

  set quantity(q: number) {
    if (q < 0) throw new Error("Quantidade nao pode ser negativa")
    this.props.quantity = q
  }

  get reorderLevel(): number {
    return this.props.reorderLevel
  }

  set reorderLevel(level: number) {
    if (level < 0) throw new Error("Quantidade minima nao pode ser negativo")
    this.props.reorderLevel = level
  }

  public needsReorder(): boolean {
    return this.props.quantity <= this.props.reorderLevel
  }
}
