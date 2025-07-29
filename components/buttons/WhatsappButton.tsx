'use client';

import {
  FloatingWhatsApp,
  FloatingWhatsAppProps,
} from 'react-floating-whatsapp';

type Props = {} & FloatingWhatsAppProps;

const WhatsappButton = ({ ...props }: Props) => {
  return <FloatingWhatsApp {...props} />;
};
export default WhatsappButton;
