import Classes from "../../../css/popup/popupuser.module.css";
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { FaSearch, FaTrash, FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';

type Item = {
    id: number;
    name: string;
    [key: string]: any;
};

type PopupDeleteSearchProps = {
    onClose: () => void;
    title: string;
    items: Item[];
    searchPlaceholder: string;
    deleteRoute: string;
    icon: React.ReactNode;
    displayField: string;
    idField: string;
};

export default function PopupDeleteSearch({ 
    onClose, 
    title, 
    items, 
    searchPlaceholder, 
    deleteRoute, 
    icon,
    displayField,
    idField
}: PopupDeleteSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);

    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        [idField]: '',
    });

    const { props } = usePage();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const flash = props.flash as { success?: string; error?: string };
        if (flash?.success) {
            setSuccessMessage(flash.success);
            setTimeout(() => {
                setSuccessMessage(null);
                onClose();
            }, 2500);
        }
        if (flash?.error) {
            setErrorMessage(flash.error);
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }, [props.flash, onClose]);

    useEffect(() => {
        const filtered = items.filter(item =>
            item[displayField].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchTerm, items, displayField]);

    const handleItemSelect = (item: Item) => {
        setSelectedItem(item);
        setData(idField, item[idField]);
        setSearchTerm(item[displayField]);
    };

    const handleDelete: FormEventHandler = (e) => {
        e.preventDefault();
        if (selectedItem) {
            destroy(route(deleteRoute, { [idField]: selectedItem[idField] }), {
                onFinish: () => {
                    reset();
                    setSelectedItem(null);
                    setSearchTerm('');
                    setShowConfirm(false);
                },
            });
        }
    };

    const confirmDelete = () => {
        if (selectedItem) {
            setShowConfirm(true);
        }
    };

    return (
        <div className={Classes.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={Classes.popup}>
                <h2>{icon} {title}</h2>

                {successMessage && (
                    <div className="mb-4 text-green-400">
                        <FaCheck className="inline mr-2" /> {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 text-red-400">
                        <FaTimes className="inline mr-2" /> {errorMessage}
                    </div>
                )}

                {!showConfirm ? (
                    <div className="space-y-4">
                        <div className={Classes.searchContainer}>
                            <FaSearch className={Classes.searchIcon} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={Classes.searchInput}
                                placeholder={searchPlaceholder}
                            />
                        </div>

                        {searchTerm && (
                            <div className={Classes.dropdownList}>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <div
                                            key={item[idField]}
                                            onClick={() => handleItemSelect(item)}
                                            className={Classes.dropdownItem}
                                        >
                                            <span className={Classes.dropdownItemText}>
                                                {item[displayField]}
                                            </span>
                                            <FaTrash className={Classes.dropdownItemIcon} />
                                        </div>
                                    ))
                                ) : (
                                    <div className={Classes.noResults}>
                                        Aucun résultat trouvé
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedItem && (
                            <div className={Classes.selectedItem}>
                                <div className={Classes.selectedItemHeader}>
                                    Élément sélectionné :
                                </div>
                                <div className={Classes.selectedItemText}>
                                    {selectedItem[displayField]}
                                </div>
                            </div>
                        )}

                        <div className={Classes.btns}>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                disabled={!selectedItem}
                                className={`${Classes.validateBtn} ${!selectedItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <FaTrash className="inline mr-2" /> Supprimer
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className={Classes.cancelBtn}
                            >
                                <FaTimes className="inline mr-2" /> Annuler
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className={Classes.confirmationBox}>
                            <div className={Classes.confirmationHeader}>
                                <FaExclamationTriangle className={Classes.confirmationIcon} />
                                <h3 className={Classes.confirmationTitle}>
                                    Confirmation de suppression
                                </h3>
                            </div>
                            <p className={Classes.confirmationText}>
                                Êtes-vous sûr de vouloir supprimer "{selectedItem?.[displayField]}" ?
                                Cette action est irréversible.
                            </p>
                        </div>

                        <form onSubmit={handleDelete}>
                            <div className={Classes.btns}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`${Classes.validateBtn} bg-red-600 hover:bg-red-700`}
                                >
                                    {processing ? (
                                        <>
                                            <FaTrash className="inline mr-2 animate-spin" /> Suppression...
                                        </>
                                    ) : (
                                        <>
                                            <FaTrash className="inline mr-2" /> Confirmer la suppression
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(false)}
                                    className={Classes.cancelBtn}
                                >
                                    <FaTimes className="inline mr-2" /> Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
} 