import React from "react";
import BannerAlert from "..";

export default function BannerAlertInfo({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <BannerAlert>
      <BannerAlert.Icon />
      <BannerAlert.Body>
        <BannerAlert.Title>{title}</BannerAlert.Title>
        <BannerAlert.Subtitle>{subtitle}</BannerAlert.Subtitle>
      </BannerAlert.Body>
    </BannerAlert>
  );
}
