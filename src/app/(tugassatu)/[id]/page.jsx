"use client";

import { useQuery } from "react-query";
import Wrapper from "@/components/Wrapper";
import Card from "@/components/Card";

export default function TugasSatu({ params }) {
  const { data } = useQuery({
    queryKey: ["tugassatu", params?.id],
    queryFn: () => fetchCarsDatas(params?.id),
  });

  return (
    <Wrapper params={params?.id}>
      <Card title={params?.id} datas={data?.data} />
    </Wrapper>
  );
}

const fetchCarsDatas = async (id) => {
  const res = await fetch(`http://localhost:3000/api/cars?id=${id}`);

  return await res.json();
};
