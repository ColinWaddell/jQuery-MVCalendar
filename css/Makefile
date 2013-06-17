DEBUG=True
LESS_FILES=build.less
CSS_FILES=mvcalendar.css
DEBUG=False

ifeq ($(DEBUG),True)
	LESSC=lessc
else
	LESSC=lessc -x
endif

all: lessc

lessc: 
	$(LESSC) $(LESS_FILES) > $(CSS_FILES)

