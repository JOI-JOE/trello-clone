import { Card, List } from "./prisma/generated/prisma-client";

export type ListWithCards = List & { cards?: Card[] };

export type CardWithList = Card & { list: List };
