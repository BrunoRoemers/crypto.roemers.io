import { ethers } from "ethers";
import { useState } from "react";
import { Form, LoaderFunction, useLoaderData } from "react-router-dom";
import AddressInput from "../../components/atoms/AddressInput";
import Button from "../../components/atoms/Button";
import ChainSelect from "../../components/atoms/ChainSelect";
import FormRow from "../../components/atoms/FormRow";
import constants from "../../constants/constants";
import isSupportedChainId from "../../utils/isSupportedChain";

const chainIdName = "chainId";
const addressName = "address";

interface LoaderData {
  chainId: number;
  address: string;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const url = new URL(request.url);
  const chainId =
    Number(url.searchParams.get(chainIdName)) ||
    constants.supportedChains[0].chainId;
  const address = url.searchParams.get(addressName) || "";
  return { chainId, address };
};

const AccountingHome = () => {
  const loaderData = useLoaderData() as LoaderData;
  const [chainId, setChainId] = useState<number>(loaderData.chainId);
  const [address, setAddress] = useState<string>(loaderData.address);

  const isChainIdValid = isSupportedChainId(chainId);
  const isAddressValid = ethers.utils.isAddress(address);

  return (
    <div>
      <div className="w-[600px] m-auto">
        <Form>
          <FormRow
            label="network"
            errorMessages={isChainIdValid ? [] : ["chain id is not valid"]}
          >
            <ChainSelect
              name={chainIdName}
              value={chainId}
              onChange={(e) => setChainId(Number(e.currentTarget.value))}
            />
          </FormRow>
          <FormRow
            label="address"
            errorMessages={isAddressValid ? [] : ["address is not valid"]}
          >
            <AddressInput
              name={addressName}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Button>Submit</Button>
          </FormRow>
        </Form>
      </div>
    </div>
  );
};

export default AccountingHome;
