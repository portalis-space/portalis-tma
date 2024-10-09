import { APILinksType, APIMetaType, JsonAPIType } from "../common/Common.types";

export type ContractType = 'evm' | 'ton';

export type GetChainsParams = {
  contractType: ContractType;
}

export type GetChainsResponse = {
  jsonapi: JsonAPIType;
  data: {
    type: "chain",
    attributes: {
      [key: string]: string;
    }
  }
}

export type NFTAttributesType = {
  contract_address: string;
  contract_name: string;
  contract_token_id: string;
  token_id: string;
  erc_type: string; // erc721
  amount: string;
  minter: string;
  owner: string;
  own_timestamp: number;
  mint_timestamp: number;
  mint_transaction_hash: string;
  mint_price: number;
  token_uri: string;
  metadata_json: string;
  name: string;
  content_type: string;
  content_uri: string;
  description: string;
  image_uri: string;
  external_link: string;
  latest_trade_price: string;
  latest_trade_symbol: string;
  latest_trade_token: string | null;
  latest_trade_timestamp: number;
  nftscan_id: string;
  nftscan_uri: string;
  small_nftscan_uri: string;
  attributes: unknown[];
  rarity_score: unknown;
  rarity_rank: unknown;
}

export type CollectionAttributesType = {
  contract_address: string;
  contract_name: string;
  logo_url: string;
  owns_total: number;
  items_total: number;
  symbol: string;
  description: string;
  floor_price: number;
  verified: boolean;
  opensea_verified: boolean;
  is_spam: boolean;
  assets: NFTAttributesType[];
}


export type CollectionType = {
  type: "collection-nft";
  attributes: CollectionAttributesType;
}

export type GetOwnedNFTsParams = {
  page: number;
  size: number;
  walletAddress?: string;
  chain?: string;
  type: ContractType;
}

export type GetOwnedNFTsResponse = {
  jsonapi: JsonAPIType;
  meta: APIMetaType;
  links: APILinksType;
  data: CollectionType[];
}