export const mask = {
    mounted(el, binding) {
        const validArgs = ["date", "time", "date_time", "cep", "phone", "phone_ddd", "phone_us", "mixed", "ip_address"];
        const mask = binding.arg;
        if (validArgs.includes(binding.arg)) {
            el.addEventListener('input', function (event) {
                applyMask(event.target, mask);
            });
        }
    }
};

function applyMask(event, mask) {
    console.log(mask);
    switch (mask) {
        case 'date':
            event.value = formatDate(event.value);
            break;
        case 'time':
            event.value = formatTime(event.value);
            break;
        case 'date_time':
            event.value = formatDateTime(event.value);
            break;
        case 'cep':
            event.value = formatCep(event.value);
            break;
        case 'phone':
            event.value = formatPhone(event.value);
            break;
        case 'phone_ddd':
            event.value = formatPhoneDDD(event.value);
            break;
        case 'phone_us':
            event.value = formatPhoneUS(event.value);
            break;
        case 'mixed':
            event.value = formatMixed(event.value);
            break;
        case 'ip_address':
            event.value = formatIpAddress(event.value);
            break;
        default: break;
    }
}

function formatIpAddress(input) {
    input = clear(input, 12);

    if (input.length <= 3) {
        return input;
    }
    if (input.length > 3 && input.length <= 6) {
        return input.replace(/^(\d{3})(\d{0,3})/, "$1.$2");
    }
    if (input.length > 6 && input.length <= 9) {
        return input.replace(/^(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    }
    if (input.length > 9) {
        return input.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3.$4");
    }
}

function formatMixed(input) {
    const cleanInput = input.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    const firstPart = cleanInput.slice(0, 3).replace(/[^A-Z]/g, '');
    const secondPart = cleanInput.slice(3, 6).replace(/[^0-9]/g, '');
    const thirdPart = cleanInput.slice(6);

    const formattedValue = `${firstPart}${secondPart ? ' ' + secondPart : ''}${thirdPart ? '-' + thirdPart : ''}`;
    return formattedValue.slice(0, 11);
}

function formatPhoneUS(input) {
    input = clear(input, 10);

    if (input.length <= 3) {
        return input;
    }
    if (input.length > 3 && input.length <= 6) {
        return input.replace(/^(\d{3})(\d{0,3})/, "($1) $2");
    }
    if (input.length > 6) {
        return input.replace(/^(\d{3})(\d{3})(\d{0,4})/, "($1) $2-$3");
    }
}

function formatPhoneDDD(input) {
    input = clear(input, 10);

    if (input.length <= 2) {
        return input;
    }
    if (input.length > 2 && input.length <= 6) {
        return input.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    }
    if (input.length > 6) {
        return input.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
}

function formatPhone(input) {
    input = clear(input, 8);

    if (input.length <= 4) {
        return input;
    }
    if (input.length > 4) {
        return input.replace(/^(\d{4})(\d{1,4})/, "$1-$2");
    }
}

function formatCep(input) {
    input = clear(input, 8);

    if (input.length <= 5) {
        return input;
    }
    if (input.length > 4) {
        return input.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
    }
}

function formatDateTime(input) {
    input = clear(input, 14);

    if (input.length <= 2) {
        return input;
    }
    if (input.length > 2 && input.length <= 4) {
        return input.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    }
    if (input.length > 4 && input.length <= 8) {
        return input.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    }
    if (input.length > 8 && input.length <= 10) {
        return input.replace(/^(\d{2})(\d{2})(\d{4})(\d{0,2})/, "$1/$2/$3 $4");
    }
    if (input.length > 10 && input.length <= 12) {
        return input.replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{0,2})/, "$1/$2/$3 $4:$5");
    }
    if (input.length > 12 && input.length <= 16) {
        return input.replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{0,2})/, "$1/$2/$3 $4:$5:$6");
    }

}

function formatTime(input) {
    input = clear(input, 6);

    if (input.length <= 2) {
        return input;
    }
    if (input.length > 2 && input.length <= 4) {
        return input.replace(/^(\d{2})(\d{0,2})/, "$1:$2");
    }
    if (input.length > 4) {
        return input.replace(/^(\d{2})(\d{2})(\d{0,2})/, "$1:$2:$3");
    }
}

function formatDate(input) {
    input = clear(input, 8);

    if (input.length <= 2) {
        return input;
    }
    if (input.length > 2 && input.length <= 4) {
        return input.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    }
    if (input.length > 4) {
        return input.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    }
}

function clear(input, degrees, isInteger = true) {
    if (isInteger) {
        input = input.replace(/\D/g, '');
    }
    input = input.slice(0, degrees);

    return input;
}