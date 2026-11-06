/**
 * SUPPORT — **Room** entity only.
 */
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("rooms")
export class RoomEntity {
  @PrimaryColumn("text")
  id!: string;

  @Column("text")
  name!: string;

  @Column("integer", { name: "total_capacity" })
  totalCapacity!: number;
}
