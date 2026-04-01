import React, { useEffect, useMemo, useState } from "react";
import { Col } from "reactstrap";
import TourCard from "../../shared/TourCard";
import { api } from "../../utils/api";

export default function FeaturedTourList({ filters }) {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/tours");
        setTours(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  //  apply filters (city + distance + maxPeople)
  const filteredTours = useMemo(() => {
    let result = [...tours];

    const city = filters?.city?.trim();
    const distance = filters?.distance;
    const maxPeople = filters?.maxPeople;

    // city
    if (city) {
      result = result.filter((t) =>
        (t.city || "").toLowerCase().includes(city.toLowerCase())
      );
    }

    // distance (works only if tour.distance exists)
    if (distance) {
      result = result.filter(
        (t) => Number(t.distance || 0) <= Number(distance)
      );
    }

    // max people (works only if tour.maxGroupSize exists)
    if (maxPeople) {
      result = result.filter(
        (t) => Number(t.maxGroupSize || 0) >= Number(maxPeople)
      );
    }

    return result;
  }, [tours, filters]);

  return (
    <>
      {filteredTours.map((tour) => (
        <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
}