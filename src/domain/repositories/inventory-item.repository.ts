import { InventoryItem } from "../entities/inventory-item"

export interface InventoryItemRepository {
  findByProductId(productId: string): Promise<InventoryItem | null>
  save(item: InventoryItem): Promise<void>
  listAll(): Promise<InventoryItem[]>
}
