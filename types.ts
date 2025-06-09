import { Card, List } from "./prisma/generated/prisma-client";

export type ListWithCards = Card & { cards?: Card[] };

export type CardWithList = List & { list: List };
