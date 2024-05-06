import { Accordion, Avatar, Group, Text, Image, Stack, ActionIcon } from "@mantine/core"
import { BsChevronDown } from "react-icons/bs"

interface AccordionLabelProps {
  label: string
  image?: string
  description?: string
  imageType?: string
}

function AccordionLabel({ label, image, description, imageType }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      {imageType === "Avatar"
        ? <Avatar src={image} radius="sm" size="lg" /> 
        : imageType === "Icon" ? <ActionIcon bg="none" style={{boxShadow: "none", padding: "0.6rem", margin: 0}}>{image}</ActionIcon>
        : null
      }
      <Stack gap="0">
        <Text c="white" mb={description ? "0" : "1rem"}>{label}</Text>
        {description ? <Text size="sm" c="dimmed" fw={300} mt="0">{description}</Text> : null}
      </Stack>
    </Group>
  );
}

export default function MultiAccordion({content}: any) {
    const items = content.map((item: any) => (
    <Accordion.Item value={item.id} key={item.label} bg="none" my="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)"}}>
      <Accordion.Control c="secondary">
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel bg="none !important">
        {item.content}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return<Accordion chevron={<BsChevronDown />}>
      {items}
    </Accordion>
}
