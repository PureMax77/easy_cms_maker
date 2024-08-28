import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { ColorResult, SketchPicker } from "react-color";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  color: string;
  onColorChange: (color: ColorResult) => void;
}

const ColorModal: React.FC<Props> = ({
  isOpen,
  onOpen,
  onOpenChange,
  color,
  onColorChange,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-y-1">
              Select Color
            </ModalHeader>
            <ModalBody className="flex justify-center items-center px-6 mt-3">
              <SketchPicker color={color} onChange={onColorChange} />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-[120px] text-white mb-2 border-2 border-sky-800 rounded-md text-lg"
                style={{ background: "#2F88FF" }}
                onPress={onClose}
              >
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ColorModal;
